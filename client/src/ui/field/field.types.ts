import { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import { LucideIcon } from "lucide-react";

interface IFieldProps {
  placeholder: string;
  error?: FieldError;
  Icon?: LucideIcon
}

export type TypeInputProps = InputHTMLAttributes<HTMLInputElement> & IFieldProps;
