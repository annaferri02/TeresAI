import type React from "react"
import { Button } from "./button"
import { Card } from "./card"

export const CustomButton = ({ className, ...props }: React.ComponentProps<typeof Button>) => (
  <Button
    className={`
      bg-custom-lilac text-white 
      hover:bg-white hover:text-custom-lilac 
      border border-custom-lilac
      hover:border-custom-lilac
      transition-colors duration-300
      ${className}
    `}
    {...props}
  />
)

export const CustomCard = ({ className, ...props }: React.ComponentProps<typeof Card>) => (
  <Card
    className={`
      bg-custom-lilac text-white 
      border border-white
      ${className}
    `}
    {...props}
  />
)

