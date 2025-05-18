import { MdDone } from "react-icons/md"

export const Features = ({features}: {features: string[]}) => {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Features</h2>
            <div className="grid grid-cols-2 gap-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <MdDone className="w-5 h-5 mr-2" color="green" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
    )
}