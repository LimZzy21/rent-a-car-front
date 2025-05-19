import { CustomButton } from "@/components/common/UI/Buttons/CustomButton"

export const CarActions = () => {
    return (
        <div className="space-y-3">
        <CustomButton className="w-full py-3 rounded-lg font-medium">
          Rent This Car
        </CustomButton>
        <CustomButton
          variant="secondary"
          className="w-full py-3 rounded-lg font-medium"
        >
          Schedule Test Drive
        </CustomButton>
      </div>
    )
}