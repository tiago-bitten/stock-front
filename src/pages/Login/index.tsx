import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoginCard } from "@/components/LoginCard"
import { Forms } from "@/components/Forms"
import { useFetch } from "@/Hooks/useFetch"


export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorInput, setErrorInput] = useState(false);
    
    const navigate = useNavigate();
    const {} = useFetch();


    const refEmail = useRef<HTMLInputElement>(null);
    const refPassword = useRef<HTMLInputElement>(null);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
    
    useEffect(() => {
        setErrorInput(false)
    }, [password, email])

    const handleCheckBoxChange = () => {
        setShowPassword(!showPassword)
        refPassword.current?.focus()

        if(showPassword) return refPassword.current?.setAttribute("type", "password")
        return refPassword.current?.setAttribute("type", "text")
    }

    const handleLogin = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        fetch.get("https://jsonplaceholder.typicode.com/posts" )
        navigate("/home")
    }

    return(
        <section className="flex items-center justify-center w-full h-screen bg-slate-200" >
            <LoginCard.Root>
                <LoginCard.Img src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" alt="Imagem de login" />
                <Forms.Root>
                    <Forms.Input id="emailInput" arialabel="Email" type="text" placeholder="Email" ref={refEmail} onChangeAction={handleEmailChange} value={email}>
                     {errorInput && <Forms.Small id="emailInput" text="Verifique se o Email esta correto" />}
                    </Forms.Input>
                    <Forms.Input id="passwordInput" arialabel="Senha" type="password" placeholder="Senha" ref={refPassword} onChangeAction={handlePasswordChange} value={password}>
                     {errorInput && <Forms.Small id="passwordInp ut" text="Verifique se a senha esta correta" />}
                    </Forms.Input>
                    <Forms.CheckBox id="senha" content="Mostrar a senha" action={handleCheckBoxChange} checked={showPassword}>
                        <Forms.Link href="/home" text="Esqueceu a senha?"/>
                    </Forms.CheckBox>
                    <Forms.Divider />
                    <Forms.Button text="Entrar" action={handleLogin}/>
                    <Forms.Text text="Não tem uma conta?">
                        <Forms.Link href="/home" text=" Cadastre-se"/>
                    </Forms.Text>
                </Forms.Root>
            </LoginCard.Root>
        </section>
    )
}
