"use client";
import { Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function SnackModal({ msg, open }: any) {
    const [snackOpen, setSnackOpen] = useState(open);
    const router = useRouter();

    return (
        <Snackbar
            open={snackOpen}
            autoHideDuration={3000}
            onClose={() => {
                setSnackOpen(false);
                router.back()
            }
            }
            message={msg}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
    )
}