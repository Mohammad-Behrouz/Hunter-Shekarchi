const BACKEND_BASE = "https://api.iqchart.ir/api/v1/"
const BACKEND_BASE_IMAGE= "https://api.iqchart.ir/api/v1"
export default function back_address() {
  console.log(BACKEND_BASE);
  console.log(BACKEND_BASE_IMAGE);
  
  return BACKEND_BASE;
}
export function back_address_image() {
  return BACKEND_BASE_IMAGE;
}
