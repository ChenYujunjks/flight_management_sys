import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function SvgGalleryPage() {
  const svgFiles = [
    { src: "/file.svg", alt: "File Icon" },
    { src: "/globe.svg", alt: "Globe Icon" },
    { src: "/next.svg", alt: "Next.js Icon" },
    { src: "/vercel.svg", alt: "Vercel Icon" },
    { src: "/window.svg", alt: "Window Icon" },
  ];

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">SVG Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {svgFiles.map((svg) => (
          <Card
            key={svg.src}
            className="p-6 flex flex-col items-center justify-center"
          >
            <Image src={svg.src} alt={svg.alt} width={100} height={100} />
            <Label className="mt-4 text-lg font-semibold">{svg.alt}</Label>
            <Button variant="secondary" className="mt-4">
              Download SVG
            </Button>
          </Card>
        ))}
      </div>
      <div className="mt-12 p-8 bg-white rounded-md shadow-md">
        <form className="space-y-4">
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Enter your name"
              required
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              className="w-full"
            />
          </div>
          <Button type="submit" variant="default" className="mt-4">
            Submit
          </Button>
        </form>
      </div>
    </main>
  );
}
