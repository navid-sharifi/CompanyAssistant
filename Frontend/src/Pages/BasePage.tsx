import { FC } from "react"

export const BasePage: FC<{
    children?: React.ReactNode
}> = ({ children }) => {

    return <div>
        {children}
    </div>
}