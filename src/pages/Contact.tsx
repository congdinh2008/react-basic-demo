import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Contact() {
    const { name, age } = useParams();
    
    useEffect(() => {
        console.log(name, age);
    }, [name, age]);
    
    return (
        <section>
            <h1 className="text-2xl font-semibold">Contact Page</h1>
        </section>
    );
}

export default Contact;