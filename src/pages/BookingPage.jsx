import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  FaPhoneAlt,
  FaTimes,
  FaUserMd,
  FaHospital,
  FaCalendarAlt,
  FaIdCard,
  FaBriefcase,
  FaUser,
  FaUserFriends,
  FaClipboardList,
} from "react-icons/fa";
import axios from "axios";
import image4 from "../assets/image4.jpg";

function BookingPage({ language }) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // نوع الإجازة
  const [leaveType, setLeaveType] = useState("patient");
  
  // بيانات المريض
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmployer, setPatientEmployer] = useState("");
  const [patientBirthDate, setPatientBirthDate] = useState("");
  
  // بيانات مرافق المريض
  const [companionName, setCompanionName] = useState("");
  const [companionId, setCompanionId] = useState("");
  const [companionPhone, setCompanionPhone] = useState("");
  const [companionEmployer, setCompanionEmployer] = useState("");
  const [companionBirthDate, setCompanionBirthDate] = useState("");
  
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(true);

  const validPasswords = ["1458978", "1589956", "1255996", "1445588"];

  const content = {
    AR: {
      title: "نموذج طلب إجازة مرضية",
      subtitle: "نقدم خدمات طبية متخصصة بأحدث التقنيات العالمية",
      password: "كلمة المرور",
      leaveType: "نوع الإجازة",
      patientLeave: "اجازة مريض",
      companionLeave: "اجازة مرافق مريض",
      selectLeaveType: "اختر نوع الإجازة",
      patientData: "بيانات المريض",
      companionData: "بيانات مرافق المريض",
      name: "الاسم الكامل",
      id: "رقم الهوية",
      phone: "رقم الجوال",
      employer: "جهة العمل",
      birthDate: "تاريخ الميلاد",
      submit: "إرسال",
      enterPassword: "إدخال",
      invalidPassword: "كلمة المرور غير صحيحة",
      successMessage: "تم إرسال بياناتك بنجاح!",
      errorMessage: "حدث خطأ في إرسال البيانات",
      fillAllFields: "يرجى إدخال جميع البيانات المطلوبة",
      selectLeaveTypeFirst: "يرجى اختيار نوع الإجازة أولاً",
    },
    EN: {
      title: "Medical Leave Request Form",
      subtitle: "We offer specialized medical services with the latest global technologies",
      password: "Password",
      leaveType: "Leave Type",
      patientLeave: "Patient Leave",
      companionLeave: "Patient Companion Leave",
      selectLeaveType: "Select Leave Type",
      patientData: "Patient Information",
      companionData: "Patient Companion Information",
      name: "Full Name",
      id: "ID Number",
      phone: "Phone Number",
      employer: "Employer",
      birthDate: "Birth Date",
      submit: "Send",
      enterPassword: "Enter",
      invalidPassword: "Invalid password",
      successMessage: "Your information has been sent successfully!",
      errorMessage: "Error submitting data",
      fillAllFields: "Please enter all required information",
      selectLeaveTypeFirst: "Please select leave type first",
    },
  };

  const currentContent = content[language];

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (validPasswords.includes(password)) {
      setIsAuthenticated(true);
      setAlertSuccess(true);
      setAlertMessage(language === "AR" ? "تم التحقق بنجاح!" : "Authentication successful!");
      setOpenAlert(true);
    } else {
      setAlertSuccess(false);
      setAlertMessage(currentContent.invalidPassword);
      setOpenAlert(true);
    }
  };

  const handleLeaveTypeChange = (event) => {
    setLeaveType(event.target.value);
    // إعادة تعيين بيانات المرافق عند تغيير نوع الإجازة
    if (event.target.value === "patient") {
      setCompanionName("");
      setCompanionId("");
      setCompanionPhone("");
      setCompanionEmployer("");
      setCompanionBirthDate("");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // التحقق من اختيار نوع الإجازة
    if (!leaveType) {
      setAlertSuccess(false);
      setAlertMessage(currentContent.selectLeaveTypeFirst);
      setOpenAlert(true);
      return;
    }

    // التحقق من البيانات المطلوبة حسب نوع الإجازة
    const patientDataComplete = patientName && patientId && patientPhone && patientEmployer && patientBirthDate;
    const companionDataComplete = companionName && companionId && companionPhone && companionEmployer && companionBirthDate;

    let isDataComplete = false;
    if (leaveType === "patient") {
      isDataComplete = patientDataComplete;
    } else if (leaveType === "companion") {
      isDataComplete = patientDataComplete && companionDataComplete;
    }

    if (isDataComplete) {
      try {
        const data = {
          data: [{
            نوع_الإجازة: leaveType === "patient" ? "اجازة مريض" : "اجازة مرافق مريض",
            اسم_المريض: patientName,
            رقم_هوية_المريض: patientId,
            رقم_الجوال_المريض: patientPhone,
            جهة_العمل_المريض: patientEmployer,
            تاريخ_الميلاد_المريض: patientBirthDate,
            اسم_مرافق_المريض: leaveType === "companion" ? companionName : "",
            رقم_هوية_مرافق_المريض: leaveType === "companion" ? companionId : "",
            رقم_الجوال_مرافق_المريض: leaveType === "companion" ? companionPhone : "",
            جهة_العمل_مرافق_المريض: leaveType === "companion" ? companionEmployer : "",
            تاريخ_الميلاد_مرافق_المريض: leaveType === "companion" ? companionBirthDate : "",
            وقت_ادخال_البيانات: new Date().toLocaleString("en-US"),
          }],
        };

        const response = await axios.post("https://sheetdb.io/api/v1/tnihqse3el5wp", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Success response:", response.data);

        setAlertSuccess(true);
        setAlertMessage(currentContent.successMessage);
        setOpenAlert(true);

        // إعادة تعيين جميع الحقول
        setLeaveType("");
        setPatientName("");
        setPatientId("");
        setPatientPhone("");
        setPatientEmployer("");
        setPatientBirthDate("");
        setCompanionName("");
        setCompanionId("");
        setCompanionPhone("");
        setCompanionEmployer("");
        setCompanionBirthDate("");
      } catch (error) {
        console.error("Full error object:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);

        setAlertSuccess(false);
        setAlertMessage(currentContent.errorMessage);
        setOpenAlert(true);
      }
    } else {
      setAlertSuccess(false);
      setAlertMessage(currentContent.fillAllFields);
      setOpenAlert(true);
    }
  };

  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      color: "#333333",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      "& fieldset": {
        borderColor: "rgba(211, 47, 47, 0.3)",
        borderWidth: "2px",
      },
      "&:hover fieldset": {
        borderColor: "rgba(211, 47, 47, 0.6)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#d32f2f",
        borderWidth: "2px",
      },
      "& input::placeholder": {
        color: "#d32f2f",
        opacity: 0.7,
      },
    },
    "& .MuiInputLabel-root": {
      color: "#d32f2f",
      fontWeight: 500,
      "&.Mui-focused": {
        color: "#d32f2f",
      },
    },
  };

  const selectSx = {
    ...textFieldSx,
    "& .MuiSelect-select": {
      color: "#333333",
      backgroundColor: "#ffffff",
    },
    "& .MuiSelect-icon": {
      color: "#d32f2f",
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        direction: language === "AR" ? "rtl" : "ltr",
        color: "#333333",
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "900px",
              height: { xs: "250px", sm: "300px", md: "350px" },
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(45deg, rgba(211, 47, 47, 0.1) 0%, rgba(244, 67, 54, 0.05) 100%)",
                zIndex: 1,
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${image4})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </Box>

          {!isAuthenticated ? (
            <Box
              sx={{
                width: "100%",
                maxWidth: "500px",
                p: { xs: 3, sm: 4, md: 5 },
                borderRadius: "20px",
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%)",
                backdropFilter: "blur(20px)",
                border: "2px solid rgba(211, 47, 47, 0.1)",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: "linear-gradient(90deg, #d32f2f 0%, #f44336 100%)",
                  borderRadius: "20px 20px 0 0",
                },
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 700,
                  mb: 4,
                  background: "linear-gradient(45deg, #d32f2f 30%, #f44336 90%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  textAlign: "center",
                  lineHeight: 1.2,
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                {language === "AR" ? "تسجيل الدخول" : "Login"}
              </Typography>

              <Box component="form" onSubmit={handlePasswordSubmit}>
                <TextField
                  label={currentContent.password}
                  variant="outlined"
                  fullWidth
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  sx={{
                    mb: 4,
                    ...textFieldSx,
                  }}
                  value={password}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    setPassword(value);
                  }}
                  dir={language === "AR" ? "rtl" : "ltr"}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    py: 3,
                    borderRadius: "15px",
                    background: "linear-gradient(45deg, #d32f2f 30%, #f44336 90%)",
                    fontSize: { xs: "1.2rem", md: "1.3rem" },
                    fontWeight: 700,
                    transition: "all 0.3s ease",
                    boxShadow: "0 10px 30px rgba(211, 47, 47, 0.4)",
                    textTransform: "none",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 15px 40px rgba(211, 47, 47, 0.5)",
                      background: "linear-gradient(45deg, #b71c1c 30%, #d32f2f 90%)",
                    },
                    "&:active": {
                      transform: "translateY(0px)",
                    },
                  }}
                >
                  <FaCalendarAlt
                    style={{
                      marginRight: language === "AR" ? "0" : "12px",
                      marginLeft: language === "AR" ? "12px" : "0",
                      fontSize: "1.1rem",
                    }}
                  />
                  {currentContent.enterPassword}
                </Button>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                maxWidth: "1000px",
                p: { xs: 3, sm: 4, md: 5 },
                borderRadius: "20px",
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%)",
                backdropFilter: "blur(20px)",
                border: "2px solid rgba(211, 47, 47, 0.1)",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: "linear-gradient(90deg, #d32f2f 0%, #f44336 100%)",
                  borderRadius: "20px 20px 0 0",
                },
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  background: "linear-gradient(45deg, #d32f2f 30%, #f44336 90%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  textAlign: "center",
                  lineHeight: 1.2,
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                {currentContent.title}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "#666666",
                  mb: 5,
                  textAlign: "center",
                  fontSize: { xs: "1.1rem", sm: "1.2rem" },
                  lineHeight: 1.6,
                  fontWeight: 400,
                }}
              >
                {currentContent.subtitle}
              </Typography>

              <Box component="form" onSubmit={handleFormSubmit}>
                {/* اختيار نوع الإجازة */}
                <Box sx={{ mb: 5 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 600,
                      mb: 3,
                      color: "#d32f2f",
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      fontSize: { xs: "1.5rem", md: "1.8rem" },
                    }}
                  >
                    <FaClipboardList style={{ fontSize: "1.2em" }} />
                    {currentContent.leaveType}
                  </Typography>

                  <FormControl fullWidth sx={selectSx}>
                    <InputLabel id="leave-type-label">{currentContent.selectLeaveType}</InputLabel>
                    <Select
                      labelId="leave-type-label"
                      value={leaveType}
                      label={currentContent.selectLeaveType}
                      onChange={handleLeaveTypeChange}
                      dir={language === "AR" ? "rtl" : "ltr"}
                    >
                      <MenuItem value="patient">{currentContent.patientLeave}</MenuItem>
                      <MenuItem value="companion">{currentContent.companionLeave}</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* بيانات المريض */}
                {(leaveType === "patient" || leaveType === "companion") && (
                  <Box sx={{ mb: 5 }}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 600,
                        mb: 3,
                        color: "#d32f2f",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        fontSize: { xs: "1.5rem", md: "1.8rem" },
                      }}
                    >
                      <FaUserMd style={{ fontSize: "1.2em" }} />
                      {currentContent.patientData}
                    </Typography>

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        gap: 3,
                        mb: 3,
                      }}
                    >
                      <TextField
                        label={currentContent.name}
                        variant="outlined"
                        fullWidth
                        sx={textFieldSx}
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        dir={language === "AR" ? "rtl" : "ltr"}
                      />

                      <TextField
                        label={currentContent.id}
                        variant="outlined"
                        fullWidth
                        sx={textFieldSx}
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        dir={language === "AR" ? "rtl" : "ltr"}
                      />
                    </Box>

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        gap: 3,
                        mb: 3,
                      }}
                    >
                      <TextField
                        label={currentContent.phone}
                        variant="outlined"
                        fullWidth
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        sx={textFieldSx}
                        value={patientPhone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          setPatientPhone(value);
                        }}
                        dir={language === "AR" ? "rtl" : "ltr"}
                      />

                      <TextField
                        label={currentContent.employer}
                        variant="outlined"
                        fullWidth
                        sx={textFieldSx}
                        value={patientEmployer}
                        onChange={(e) => setPatientEmployer(e.target.value)}
                        dir={language === "AR" ? "rtl" : "ltr"}
                      />
                    </Box>

                    <TextField
                      label={currentContent.birthDate}
                      variant="outlined"
                      fullWidth
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={textFieldSx}
                      value={patientBirthDate}
                      onChange={(e) => setPatientBirthDate(e.target.value)}
                      dir={language === "AR" ? "rtl" : "ltr"}
                    />
                  </Box>
                )}

                {/* بيانات مرافق المريض - تظهر فقط عند اختيار "اجازة مرافق مريض" */}
                {leaveType === "companion" && (
                  <>
                    <Divider
                      sx={{
                        my: 4,
                        backgroundColor: "rgba(211, 47, 47, 0.2)",
                        height: "2px",
                      }}
                    />

                    <Box sx={{ mb: 4 }}>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 600,
                          mb: 3,
                          color: "#d32f2f",
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          fontSize: { xs: "1.5rem", md: "1.8rem" },
                        }}
                      >
                        <FaUserFriends style={{ fontSize: "1.2em" }} />
                        {currentContent.companionData}
                      </Typography>

                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                          gap: 3,
                          mb: 3,
                        }}
                      >
                        <TextField
                          label={currentContent.name}
                          variant="outlined"
                          fullWidth
                          sx={textFieldSx}
                          value={companionName}
                          onChange={(e) => setCompanionName(e.target.value)}
                          dir={language === "AR" ? "rtl" : "ltr"}
                        />

                        <TextField
                          label={currentContent.id}
                          variant="outlined"
                          fullWidth
                          sx={textFieldSx}
                          value={companionId}
                          onChange={(e) => setCompanionId(e.target.value)}
                          dir={language === "AR" ? "rtl" : "ltr"}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                          gap: 3,
                          mb: 3,
                        }}
                      >
                        <TextField
                          label={currentContent.phone}
                          variant="outlined"
                          fullWidth
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          sx={textFieldSx}
                          value={companionPhone}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, "");
                            setCompanionPhone(value);
                          }}
                          dir={language === "AR" ? "rtl" : "ltr"}
                        />

                        <TextField
                          label={currentContent.employer}
                          variant="outlined"
                          fullWidth
                          sx={textFieldSx}
                          value={companionEmployer}
                          onChange={(e) => setCompanionEmployer(e.target.value)}
                          dir={language === "AR" ? "rtl" : "ltr"}
                        />
                      </Box>

                      <TextField
                        label={currentContent.birthDate}
                        variant="outlined"
                        fullWidth
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={textFieldSx}
                        value={companionBirthDate}
                        onChange={(e) => setCompanionBirthDate(e.target.value)}
                        dir={language === "AR" ? "rtl" : "ltr"}
                      />
                    </Box>
                  </>
                )}

                {/* زر الإرسال */}
                {(leaveType === "patient" || leaveType === "companion") && (
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      py: 3,
                      mt: 4,
                      borderRadius: "15px",
                      background: "linear-gradient(45deg, #d32f2f 30%, #f44336 90%)",
                      fontSize: { xs: "1.2rem", md: "1.3rem" },
                      fontWeight: 700,
                      transition: "all 0.3s ease",
                      boxShadow: "0 10px 30px rgba(211, 47, 47, 0.4)",
                      textTransform: "none",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 15px 40px rgba(211, 47, 47, 0.5)",
                        background: "linear-gradient(45deg, #b71c1c 30%, #d32f2f 90%)",
                      },
                      "&:active": {
                        transform: "translateY(0px)",
                      },
                    }}
                  >
                    <FaCalendarAlt
                      style={{
                        marginRight: language === "AR" ? "0" : "12px",
                        marginLeft: language === "AR" ? "12px" : "0",
                        fontSize: "1.1rem",
                      }}
                    />
                    {currentContent.submit}
                  </Button>
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Container>

      <Dialog
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        PaperProps={{
          sx: {
            borderRadius: "20px",
            background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
            border: `3px solid ${alertSuccess ? "#4CAF50" : "#f44336"}`,
            minWidth: "350px",
            maxWidth: "90%",
            boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
          },
        }}
      >
        <DialogTitle
          sx={{
            color: alertSuccess ? "#4CAF50" : "#f44336",
            textAlign: "center",
            pt: 4,
            pb: 2,
            fontSize: "1.4rem",
            fontWeight: 700,
          }}
        >
          {alertSuccess
            ? language === "AR"
              ? "تم بنجاح!"
              : "Success!"
            : language === "AR"
            ? "تنبيه!"
            : "Alert!"}
          <IconButton
            onClick={() => setOpenAlert(false)}
            sx={{
              position: "absolute",
              right: language === "AR" ? "auto" : 12,
              left: language === "AR" ? 12 : "auto",
              top: 12,
              color: alertSuccess ? "#4CAF50" : "#f44336",
              backgroundColor: "rgba(0,0,0,0.05)",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.1)",
              },
            }}
          >
            <FaTimes />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            color: "#333333",
            textAlign: "center",
            pb: 4,
            px: 4,
          }}
        >
          <Typography sx={{ fontSize: "1.1rem", lineHeight: 1.6, fontWeight: 500 }}>
            {alertMessage}
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default BookingPage;