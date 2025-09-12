"use client"
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

const SIGNIN_TYPES = {
    SMS: "sms" as const,
    PASSWORD: "password" as const
}

export function Signin() {
    const [activeTab, setActiveTab] = useState<"sms" | "password">(SIGNIN_TYPES.SMS)
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [verificationCode, setVerificationCode] = useState("")
    const [countdown, setCountdown] = useState(0)
    const [isCodeSent, setIsCodeSent] = useState(false)
    const handleGetVerificationCode = () => {
        // 获取验证码逻辑
        if (!phoneNumber) return
        setIsCodeSent(true)
        setCountdown(60)
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown <= 1) {
                    clearInterval(timer)
                    setIsCodeSent(false)
                    return 0
                }
                return prevCountdown - 1
            });
        }, 1000);
    }

    const handleSignIn = () => {
        // 登录逻辑
    }
    return (
        <div className="w-full max-w-sm mx-auto px-6 py-8">
            {/* Tab Navigation */}
            <div className="flex mb-8 border-b border-border">
                <button
                    className={cn("flex-1 pb-4 text-center font-medium transtion-colors text-base", activeTab === SIGNIN_TYPES.SMS ? "text-foreground border-b-2 border-primary" : "text-muted-foreground")}
                    onClick={() => setActiveTab(SIGNIN_TYPES.SMS)}

                >验证码登录</button>
                <button
                    className={cn("flex-1 pb-4 text-center font-medium transtion-colors text-base", activeTab === SIGNIN_TYPES.PASSWORD ? "text-foreground border-b-2 border-primary" : "text-muted-foreground")}
                    onClick={() => setActiveTab(SIGNIN_TYPES.PASSWORD)}
                >密码登录</button>
            </div>

            {/* Phone Number Input */}
            <div className="space-y-4">
                <div className="relative">
                    <div className="flex items-center bg-muted/50 rounded-lg border overflow-hidden">
                        <div className="flex items-center px-4 py-4 border-r">
                            <span className="text-sm text-foreground font-medium">+86</span>
                            <svg className="w-4 h-4 ml-2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        <Input
                            type="tel"
                            placeholder="请输入手机号"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="border-0 bg-transparent placeholder:text-muted-foreground text-base py-4 px-4 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                        />
                    </div>
                </div>


                {activeTab === SIGNIN_TYPES.SMS && (
                    <div className="space-y-3">
                        <div className="relative">
                            <div className="flex items-center bg-muted/50 rounded-lg border overflow-hidden h-14">
                                <Input
                                    type="text"
                                    placeholder="请输入验证码"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    maxLength={6}
                                    className="border-0 bg-transparent placeholder:text-muted-foreground text-base py-4 px-4 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 shadow-none h-full"
                                />
                                <div className="border-l h-full">
                                    <Button
                                        variant="ghost"
                                        onClick={handleGetVerificationCode}
                                        disabled={phoneNumber.length < 11 || countdown > 0}
                                        className="whitespace-nowrap text-muted-foreground hover:text-foreground px-4 py-4 h-full rounded-none"
                                    >
                                        {countdown > 0 ? `${countdown}s后重新发送` : "获取验证码"}
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </div>
                )}

                {activeTab === SIGNIN_TYPES.PASSWORD && (
                    <div className="relative">
                        <div className="flex items-center bg-muted/50 rounded-lg border overflow-hidden h-14">
                            <div className="flex items-center px-4 py-4 border-r h-full">
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>

                                    ) : (

                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="请输入密码"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border-0 bg-transparent placeholder:text-muted-foreground text-base py-4 px-4 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none h-full"
                            />
                        </div>
                    </div>
                )}

                <Button
                    onClick={handleSignIn}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-4 rounded-lg text-base mt-8 h-14"
                    disabled={
                        !phoneNumber ||
                        (activeTab === SIGNIN_TYPES.SMS && !verificationCode) ||
                        (activeTab === SIGNIN_TYPES.PASSWORD && !password)
                    }
                >

                    {activeTab === SIGNIN_TYPES.SMS ? "登录/注册" : "登录"}
                </Button>

            </div>



        </div >
    )
}