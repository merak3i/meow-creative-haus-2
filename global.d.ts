// Pull in Next.js's official static-image module declarations so that
// `import logo from "@/assets/foo.png"` type-checks under `tsc --noEmit`
// in CI, where `next-env.d.ts` (git-ignored) is not present on a fresh checkout.
/// <reference types="next/image-types/global" />
