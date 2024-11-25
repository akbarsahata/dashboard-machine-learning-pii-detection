"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { verifyPrelaunchedCode } from "./actions";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your password must be 6 characters.",
  }),
});
export function PrelaunchedGateForm({
  isAllowed,
  children,
}: PreLaunchGateFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const isPasswordCorrect = await verifyPrelaunchedCode(data.pin);
    if (!isPasswordCorrect) {
      return toast("Invalid password", {
        description: "Please try again",
      });
    }
  }

  if (!isAllowed) {
    return (
      <main className="mx-auto mt-20 w-fit">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      render={({ slots }) => (
                        <InputOTPGroup>
                          {slots.map((slot, index) => (
                            <InputOTPSlot key={index} {...slot} />
                          ))}{" "}
                        </InputOTPGroup>
                      )}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button>Submit</Button>
          </form>
        </Form>
      </main>
    );
  }
  return children;
}

interface PreLaunchGateFormProps {
  isAllowed: boolean;
  children?: React.ReactNode;
}
