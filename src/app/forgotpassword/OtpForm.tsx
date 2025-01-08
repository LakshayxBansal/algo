"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { styles } from "../utils/styles/sign.styles";
import { encrypt } from "../utils/encrypt.utils";

interface OtpFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  contact: string;
}

export default function OtpForm({ setOpen, contact }: OtpFormProps) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();

  const handleClose = (): void => setOpen(false);

  const handleChange = (index: number, value: string) => {
    if (/^\d$/.test(value) || value === "") {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      // Move focus to the next box if a digit is entered
      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      // Move focus to the previous box if the current one is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      alert("Please enter all 6 digits.");
      return;
    }
    //Validate OTP here

    setOtp(["", "", "", "", "", ""]); // Reset OTP input
    setOpen(false); // Close the dialog
    contact = contact.replace(/\s+/g, "");
    const encryptedContact = await encrypt(contact);
    router.push(`/resetpassword?contact=${encryptedContact}`);
  };

  return (
    <>
      <Typography sx={{ textAlign: "center", color: "green", mt: 2 }}>
        OTP sent to {contact}
      </Typography>
      <Box display="flex" gap={1} justifyContent="center">
        {otp.map((digit, index) => (
          <TextField
            key={index}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              handleKeyDown(index, e)
            }
            inputProps={{
              maxLength: 1,
              style: {
                textAlign: "center",
                fontSize: "2rem",
                width: "2em",
                height: "1em",
              },
            }}
            autoFocus={index === 0}
            inputRef={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </Box>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          onClick={handleClose}
          sx={{ ...styles.toggleLink, textTransform: "none" }}
          tabIndex={-1}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          sx={{ ...styles.pillStyledButton, width: "20%" }}
        >
          Submit
        </Button>
      </DialogActions>
    </>
  );
}
