"use client";
import { fetchProfileById } from "@/app/controllers/profile.controller";
import { Box, CircularProgress, Portal, Snackbar, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Home from "../page";
import { CreateProfileInputT } from "@/app/models/profile.model";

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const profileId = Number(params.id); // Convert string to number

  const [profileData, setProfileData] = useState<CreateProfileInputT | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isNaN(profileId) || profileId <= 0) {
      handleError("Invalid Profile ID.");
      return;
    }

    fetchProfileById(profileId)
      .then((result) => {
        if (result.status && result.data) {
          setProfileData(result.data);
          setLoading(false);
        } else {
          const errorMessage =
            result.data?.length > 0
              ? result.data[0]?.error_text || "Profile not found"
              : "Profile not found";
          handleError(errorMessage);
        }
      })
      .catch(() => handleError("An error occurred while fetching user data."));
  }, [profileId]);

  const handleError = (message: string) => {
    setSnackMessage(message);
    setSnackOpen(true);
    setLoading(false); // Prevent infinite loading state

    setTimeout(() => {
      router.replace("/home"); // Use replace to avoid history stacking
    }, 1000);
  };

  return (
    <>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      ) : (
        profileData && <Home data={profileData} />
      )}

      <Portal>
        <Snackbar
          open={snackOpen}
          autoHideDuration={1000}
          onClose={() => setSnackOpen(false)}
          message={snackMessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Portal>
    </>
  );
}
