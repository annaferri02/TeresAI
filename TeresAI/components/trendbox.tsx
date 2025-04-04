
import { TrendingUp, TrendingDown, Copy} from 'lucide-react'
import {CustomButton, CustomCard} from "@/components/ui/custom-styles"

export default function TrendBox({direction, description, emoji}) {
    return (
    <div className="bg-red p-4 rounded-lg shadow-lg flex items-center bg-white gap-4">
        <div className="text-center">
          {direction === "increase" ? (
            <TrendingUp className="w-8 h-8 text-green-500 m-auto" />
          ) : (
            <TrendingDown className="w-8 h-8 text-red-500 m-auto" />
          )}
          <span className="text-2xl">{emoji}</span>
        </div>
        <div className="mr-2">
          <p className="text-dark-lilac mb-2 text-lg">{description}</p>
        </div>
        <CustomButton className="ml-auto"><Copy/>Copy</CustomButton>
    </div>
    )
}