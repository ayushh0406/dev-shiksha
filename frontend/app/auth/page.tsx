"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Github, Mail, Sparkles, Zap, Trophy } from "lucide-react"
import Link from "next/link"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleAuth = async (type: "login" | "signup") => {
    setIsLoading(true)
    // Simulate auth process
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/home"
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-teal-900/20 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Welcome Panel */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-8 p-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-16 h-16 rounded-2xl quest-gradient flex items-center justify-center neo-brutal">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-black text-gray-900 dark:text-white">LearnQuest AI</h1>
            </div>
            <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">Your Quest to Learn Begins Here!</p>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
              Join thousands of learners on an epic journey to master programming, algorithms, and more through gamified
              challenges.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 w-full max-w-md">
            <Card className="glass-card p-4 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <p className="text-sm font-semibold">10K+ Quests</p>
            </Card>
            <Card className="glass-card p-4 text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <p className="text-sm font-semibold">AI Powered</p>
            </Card>
            <Card className="glass-card p-4 text-center">
              <Zap className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <p className="text-sm font-semibold">Real Progress</p>
            </Card>
          </div>
        </div>

        {/* Auth Card */}
        <Card className="w-full max-w-md mx-auto glass-card neo-brutal">
          <CardHeader className="text-center">
            <div className="lg:hidden flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-xl quest-gradient flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-black">LearnQuest AI</h1>
            </div>
            <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
            <CardDescription>Continue your learning journey</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" className="font-semibold">
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="font-semibold">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" className="rounded-2xl border-2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" className="rounded-2xl border-2" />
                </div>
                <div className="text-right">
                  <Link href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Button
                  onClick={() => handleAuth("login")}
                  disabled={isLoading}
                  className="w-full rounded-2xl font-bold py-6 quest-gradient neo-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  {isLoading ? "Logging in..." : "Start Your Quest"}
                </Button>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" type="text" placeholder="John Doe" className="rounded-2xl border-2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" type="email" placeholder="your@email.com" className="rounded-2xl border-2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" type="password" placeholder="••••••••" className="rounded-2xl border-2" />
                </div>
                <Button
                  onClick={() => handleAuth("signup")}
                  disabled={isLoading}
                  className="w-full rounded-2xl font-bold py-6 quest-gradient neo-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  {isLoading ? "Creating Account..." : "Begin Your Journey"}
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-6">
              <Separator className="my-4" />
              <div className="space-y-3">
                <Button variant="outline" className="w-full rounded-2xl font-semibold py-6 border-2 bg-transparent">
                  <Mail className="w-4 h-4 mr-2" />
                  Continue with Google
                </Button>
                <Button variant="outline" className="w-full rounded-2xl font-semibold py-6 border-2 bg-transparent">
                  <Github className="w-4 h-4 mr-2" />
                  Continue with GitHub
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
