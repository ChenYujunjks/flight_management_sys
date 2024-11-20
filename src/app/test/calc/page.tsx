"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/components/provider";

const FactorialPage = () => {
  const [inputValue, setInputValue] = useState(0);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateFactorial = trpc.calculateFactorial.useMutation();

  const handleSubmit = () => {
    setError(null);
    calculateFactorial.mutate(inputValue, {
      onSuccess: (data) => {
        setResult(data.result);
      },
      onError: (err) => {
        setError(err.message);
      },
    });
  };
  return (
    <Card className="p-6 max-w-md mx-auto mt-10">
      <h1 className="text-xl font-semibold mb-4">Factorial Calculator</h1>
      <div className="mb-4">
        <Input
          type="number"
          min="0"
          value={inputValue}
          onChange={(e) => setInputValue(parseInt(e.target.value, 10))}
          placeholder="Enter a number"
          className="mb-2"
        />
      </div>
      <Button onClick={handleSubmit}>Calculate</Button>
      {result !== null && <p className="mt-4">Result: {result}</p>}
      {error && <p className="mt-4 text-red-500">Error: {error}</p>}
    </Card>
  );
};

export default FactorialPage;
