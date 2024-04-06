import React from 'react'
// import {
//     Form,
//     FormControl, 
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage
// } from "@/components/ui/form"
import { useForm } from "react-hook-form"


const RichBeach = () => {
    const form = useForm({
        mode: 'onChange',
        defaultValues: {
            title: "",
            price: 30,
            description: ""
        }
    })
    return (
        <div>
            <form>
                <h3>title</h3>
                <input type="text" />
                <h3>Post</h3>
                <input type="text" />
            </form>
        </div>
    )
}

export default RichBeach