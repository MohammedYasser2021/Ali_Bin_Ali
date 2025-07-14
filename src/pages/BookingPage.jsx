import React, { useState, useEffect } from "react";
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
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";

function BookingPage({ language }) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [employer, setEmployer] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [image1, image2, image3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const content = {
    AR: {
      title: "احجز موعدك الآن",
      subtitle: "نقدم خدمات طبية متخصصة بأحدث التقنيات العالمية",
      name: "الاسم الكامل",
      id: "رقم الهوية",
      phone: "رقم الجوال",
      employer: "جهة العمل",
      birthDate: "تاريخ الميلاد",
      submit: "احجز الآن",
      successMessage: "تم إرسال بياناتك بنجاح!",
      errorMessage: "حدث خطأ في إرسال البيانات",
      fillAllFields: "يرجى إدخال جميع البيانات",
    },
    EN: {
      title: "Book Your Appointment Now",
      subtitle:
        "We offer specialized medical services with the latest global technologies",
      name: "Full Name",
      id: "ID Number",
      phone: "Phone Number",
      employer: "Employer",
      birthDate: "Birth Date",
      submit: "Book Now",
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
        const data = {
          Name: name,
          ID: id,
          Phone: phone,
          Employer: employer,
          BirthDate: birthDate,
          Date: new Date().toLocaleString("en-US"),
        };

        await axios.post("https://sheetdb.io/api/v1/tnihqse3el5wp", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

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
        console.error("Error:", error);
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
      "& fieldset": { borderColor: "rgba(211, 47, 47, 0.3)" },
      "&:hover fieldset": {
        borderColor: "rgba(211, 47, 47, 0.5)",
      },
      "&.Mui-focused fieldset": { borderColor: "#d32f2f" },
      "& input::placeholder": {
        color: "#d32f2f",
        opacity: 0.7,
      },
    },
    "& .MuiInputLabel-root": { 
      color: "#d32f2f",
      "&.Mui-focused": {
        color: "#d32f2f",
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)",
        direction: language === "AR" ? "rtl" : "ltr",
        color: "#333333",
      }}
    >
      {/* Image Slider Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "399px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "1600px",
              height: "399px",
              backgroundImage: `url(${image})`,
              backgroundSize: "1600px 399px",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: index === currentImageIndex ? 1 : 0,
              transition: "opacity 1s ease-in-out",
            }}
          />
        ))}
      </Box>

      {/* Form Section */}
      <Box
        sx={{
          py: { xs: 4, md: 6 },
          background: "linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: "900px",
                p: { xs: 3, sm: 4, md: 5 },
                borderRadius: "20px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 249, 250, 0.98) 100%)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(211, 47, 47, 0.1)",
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
                  fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
                  textAlign: "center",
                  lineHeight: 1.2,
                }}
              >
                {currentContent.title}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "#666666",
                  mb: 4,
                  textAlign: "center",
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  lineHeight: 1.5,
                }}
              >
                {currentContent.subtitle}
              </Typography>

              <Box component="form" onSubmit={handleFormSubmit}>
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
                    mb: 4,
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
                    py: 2.5,
                    borderRadius: "12px",
                    background:
                      "linear-gradient(45deg, #d32f2f 30%, #f44336 90%)",
                    fontSize: { xs: "1.1rem", md: "1.2rem" },
                    fontWeight: 600,
                    transition: "all 0.3s ease",
                    boxShadow: "0 8px 25px rgba(211, 47, 47, 0.3)",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "0 12px 35px rgba(211, 47, 47, 0.4)",
                    },
                  }}
                >
                  <FaCalendarAlt
                    style={{
                      marginRight: language === "AR" ? "0" : "8px",
                      marginLeft: language === "AR" ? "8px" : "0",
                      fontSize: "1rem",
                    }}
                  />
                  {currentContent.submit}
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Alert Dialog */}
      <Dialog
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        PaperProps={{
          sx: {
            borderRadius: "15px",
            background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
            border: `2px solid ${alertSuccess ? "#4CAF50" : "#f44336"}`,
            minWidth: "300px",
            maxWidth: "90%",
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          },
        }}
      >
        <DialogTitle
          sx={{
            color: alertSuccess ? "#4CAF50" : "#f44336",
            textAlign: "center",
            pt: 3,
            pb: 2,
            fontSize: "1.3rem",
            fontWeight: 600,
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
              right: language === "AR" ? "auto" : 8,
              left: language === "AR" ? 8 : "auto",
              top: 8,
              color: alertSuccess ? "#4CAF50" : "#f44336",
            }}
          >
            <FaTimes />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            color: "#333333",
            textAlign: "center",
            pb: 3,
          }}
        >
          <Typography sx={{ fontSize: "1rem", lineHeight: 1.5 }}>
            {alertMessage}
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default BookingPage;
