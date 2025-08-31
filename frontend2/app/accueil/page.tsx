import { redirect } from "next/navigation";

export default function AccueilPage() {
  redirect("/");
  // The rest of your component will not be rendered
  return null;
}
