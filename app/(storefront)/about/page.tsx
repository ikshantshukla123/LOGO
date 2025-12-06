import {Metadata} from "next";



export const metadata : Metadata ={
  title: "About Us",
  description: "Learn more about us",
}




export default function AboutPage() {
  return (
    <div className="p-10 text-3xl">
      About Page
    </div>
  );
}
