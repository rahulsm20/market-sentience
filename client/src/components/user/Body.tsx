import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { generateStrategies } from "@/api";
import Markdown from "react-markdown";
import Analytics from "./Analytics";

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);

  // Update the stopwatch every second
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="text-sm">Elapsed Time: {seconds} seconds</span>;
};
const Body = () => {
  const form = useForm<FieldValues>();
  const categories = [
    "Mobiles",
    "Television",
    "Refridgerators",
    "Laptops",
    "Smartwatches",
  ];
  const [loading, setLoading] = useState(false);
  const [showStopwatch, setShowStopwatch] = useState(false);
  const [strategies, setStrategies] = useState("");
  const [productData, setProductData] = useState([]);
  const [sentiments, setSentiments] = useState([]);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    setShowStopwatch(true);
    try {
      const res = await generateStrategies(data.company, data.category);
      console.log(res, data);
      const { data: result, productData } = res;
      setStrategies(result?.response);
      setProductData(productData);
      setSentiments(result?.sentiments);
    } catch (err) {
      alert("An error occurred. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
      setShowStopwatch(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl">
        Sentiment Analysis and Marketing Strategy Generation Using Large
        Language Model
      </h1>
      <Form {...form}>
        <form
          className="w-full flex flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormLabel>Company</FormLabel>
          <Input
            placeholder="Enter Company Name"
            {...form.register("company")}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category of products to search" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div className="flex gap-2">
        {loading && <LoaderIcon className="animate-spin" />}
        {showStopwatch && <Stopwatch />}
        <div className="flex flex-col">
          {productData && sentiments && strategies && !loading && (
            <Analytics sentiments={sentiments} productData={productData} />
          )}
          {strategies && !loading && (
            <Markdown className="flex flex-col gap-5">{strategies}</Markdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
