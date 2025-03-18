"use client";

import { FileIcon as LucideFileIcon, FileTextIcon, ImageIcon } from "lucide-react";
import { getFileType, getFileTypeIconProps } from "@/lib/utils/file-utils";
import { cn } from "@/lib/utils";

interface FileIconProps {
  /**
   * Filename or file extension to determine the icon type
   */
  fileName: string;
  
  /**
   * Optional size of the icon (small, medium, large) or specify exact size
   * @default "medium"
   */
  size?: "small" | "medium" | "large" | number;
  
  /**
   * Additional class names to apply
   */
  className?: string;
}

/**
 * Renders an appropriate icon based on the file type
 */
export function FileIcon({ fileName, size = "medium", className }: FileIconProps) {
  const type = getFileType(fileName);
  const { icon, color } = getFileTypeIconProps(type);
  
  // Determine icon size based on the size prop
  let sizeClass = "";
  if (typeof size === "number") {
    sizeClass = `h-${size} w-${size}`;
  } else {
    switch (size) {
      case "small":
        sizeClass = "h-4 w-4";
        break;
      case "medium":
        sizeClass = "h-6 w-6";
        break;
      case "large":
        sizeClass = "h-12 w-12";
        break;
    }
  }
  
  const iconClassName = cn(sizeClass, color, className);
  
  switch (icon) {
    case "FileText":
      return <FileTextIcon className={iconClassName} />;
    case "Image":
      return <ImageIcon className={iconClassName} />;
    case "File":
      return <LucideFileIcon className={iconClassName} />;
    default:
      return <FileTextIcon className={iconClassName} />;
  }
} 