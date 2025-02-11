import * as z from "zod";
import { createProfileSchema  } from "../zodschema/profileSchema";

export type CreateProfileInputT = z.infer<typeof createProfileSchema>;