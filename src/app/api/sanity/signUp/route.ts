import { signUpHandler } from "next-auth-sanity";

import sanityClient from "@/lib/sanity";
import { SanityClient } from "sanity";

export const POST = signUpHandler(sanityClient as SanityClient);
