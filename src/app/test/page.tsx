"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useState } from "react";

const TestUIPage = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">ShadCN UI Test Page</h1>

      <Card className="w-full max-w-md p-6 bg-white shadow-md mb-6">
        <Label
          htmlFor="exampleInput"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Example Input
        </Label>
        <Input
          id="exampleInput"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="mb-4"
        />
        <Button onClick={() => alert(`You entered: ${inputValue}`)}>
          Submit
        </Button>
      </Card>

      <Card className="w-full max-w-md p-6 bg-white shadow-md">
        <h2 className="text-xl font-semibold mb-4">Example Card</h2>
        <p className="text-gray-600 mb-4">
          This is an example card component. You can use it to group related
          information.
        </p>
        <Button variant="secondary">Secondary Action</Button>
      </Card>
    </div>
  );
};

export default TestUIPage;
