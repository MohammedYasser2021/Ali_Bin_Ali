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
} from "@mui/material";
import {
  FaPhoneAlt,
  FaTimes,
  FaUserMd,
  FaHospital,
  FaCalendarAlt,
  FaIdCard,
  FaBriefcase,
} from "react-icons/fa";
import axios from "axios";
import image4 from "../assets/image4.jpg";

function BookingPage({ language }) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [employer, setEmployer] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(true);

  const content = {
    AR: {
      title: " نموذج طلب إجازة",
      subtitle: "نقدم خدمات طبية متخصصة بأحدث التقنيات العالمية",
      name: "الاسم الكامل",
      id: "رقم الهوية",
      phone: "رقم الجوال",
      employer: "جهة العمل",
      birthDate: "تاريخ الميلاد",
      submit: "إرسال ",
      successMessage: "تم إرسال بياناتك بنجاح!",
      errorMessage: "حدث خطأ في إرسال البيانات",
      fillAllFields: "يرجى إدخال جميع البيانات",
    },
    EN: {
      title: "Leave Request Form",
      subtitle:
        "We offer specialized medical services with the latest global technologies",
      name: "Full Name",
      id: "ID Number",
      phone: "Phone Number",
      employer: "Employer",
      birthDate: "Birth Date",
      submit: "Send",
      successMessage: "Your information has been sent successfully!",
      errorMessage: "Error submitting data",
      fillAllFields: "Please enter all information",
    },
  };

  const currentContent = content[language];

const handleFormSubmit = async (e) => {
  e.preventDefault();

  if (name && id && phone && employer && birthDate) {
    try {
      // Format the data according to SheetDB requirements
      const data = {
        data: [{
          الإسم_بالكامل: name,
          رقم_الهوية: id,
          رقم_الجوال: phone,
          جهة_العمل: employer,
          تاريخ_الميلاد: birthDate,
          التاريخ: new Date().toLocaleString("en-US"),
        }]
      };

      const response = await axios.post("https://sheetdb.io/api/v1/tnihqse3el5wp", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log('Success response:', response.data);
      
      setAlertSuccess(true);
      setAlertMessage(currentContent.successMessage);
      setOpenAlert(true);

      // Clear form
      setName("");
      setId("");
      setPhone("");
      setEmployer("");
      setBirthDate("");
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


  // Common TextField styling with red placeholder
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
          {/* Header Image */}
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
              }
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

          {/* Form Section */}
          <Box
            sx={{
              width: "100%",
              maxWidth: "900px",
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
              }
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
                background:
                  "linear-gradient(45deg, #d32f2f 30%, #f44336 90%)",
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
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  gap: 4,
                  mb: 4,
                }}
              >
                <TextField
                  label={currentContent.name}
                  variant="outlined"
                  fullWidth
                  sx={textFieldSx}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  dir={language === "AR" ? "rtl" : "ltr"}
                />

                <TextField
                  label={currentContent.id}
                  variant="outlined"
                  fullWidth
                  sx={textFieldSx}
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  dir={language === "AR" ? "rtl" : "ltr"}
                />
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  gap: 4,
                  mb: 4,
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
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    setPhone(value);
                  }}
                  dir={language === "AR" ? "rtl" : "ltr"}
                />

                <TextField
                  label={currentContent.employer}
                  variant="outlined"
                  fullWidth
                  sx={textFieldSx}
                  value={employer}
                  onChange={(e) => setEmployer(e.target.value)}
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
                sx={{
                  mb: 5,
                  ...textFieldSx,
                }}
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                dir={language === "AR" ? "rtl" : "ltr"}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 3,
                  borderRadius: "15px",
                  background:
                    "linear-gradient(45deg, #d32f2f 30%, #f44336 90%)",
                  fontSize: { xs: "1.2rem", md: "1.3rem" },
                  fontWeight: 700,
                  transition: "all 0.3s ease",
                  boxShadow: "0 10px 30px rgba(211, 47, 47, 0.4)",
                  textTransform: "none",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 15px 40px rgba(211, 47, 47, 0.5)",
                    background:
                      "linear-gradient(45deg, #b71c1c 30%, #d32f2f 90%)",
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
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Alert Dialog */}
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
