/* @author: dwclake
 * @created: 10-17-2025
 */

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const GoHome = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate("/")
    })

    return <></>;
}