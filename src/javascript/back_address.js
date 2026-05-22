const BACKEND_BASE = process.env.NEXT_PUBLIC_BASE_BACK_ADDRESS_SLASH
const BACKEND_BASE_IMAGE= process.env.NEXT_PUBLIC_BASE_BACK_ADDRESS
export default function back_address() {
  console.log(BACKEND_BASE);
  console.log(BACKEND_BASE_IMAGE);
  
  return BACKEND_BASE;
}
export function back_address_image() {
  return BACKEND_BASE_IMAGE;
}
