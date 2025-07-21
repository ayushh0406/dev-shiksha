"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { User, Mail, Calendar, MapPin, Trophy, Zap, Target, Star, Settings, LogOut, Camera, Save } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    bio: "Passionate developer on a quest to master algorithms and data structures. Love solving complex problems and learning new technologies!",
    location: "San Francisco, CA",
    joinDate: "January 2024",
    website: "https://alexjohnson.dev",
  })

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    publicProfile: true,
  })

  const stats = {
    totalXP: 2450,
    level: 5,
    questsCompleted: 24,
    streak: 12,
    badges: 8,
    rank: "Advanced Learner",
  }

  const achievements = [
    { name: "First Steps", icon: "🎯", earned: true },
    { name: "Quiz Master", icon: "🧠", earned: true },
    { name: "Perfectionist", icon: "💯", earned: true },
    { name: "Speed Demon", icon: "⚡", earned: false },
    { name: "Streak Master", icon: "🔥", earned: false },
    { name: "Algorithm Ace", icon: "🏆", earned: false },
  ]

  const recentActivity = [
    { title: "Completed Bubble Sort Quiz", xp: 100, date: "2 hours ago" },
    { title: "Finished Array Fundamentals", xp: 150, date: "1 day ago" },
    { title: "Started Binary Search Trees", xp: 0, date: "2 days ago" },
    { title: "Earned Quiz Master Badge", xp: 50, date: "3 days ago" },
  ]

  const handleSave = () => {
    setIsEditing(false)
    // Save profile data logic here
  }

  const handleLogout = () => {
    // Logout logic here
    window.location.href = "/auth"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-teal-900/20">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-4">Your Profile</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Manage your account and track your learning journey
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="glass-card neo-brutal">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" />
                      <AvatarFallback className="text-2xl font-bold">AJ</AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                      onClick={() => {
                        /* Handle avatar upload */
                      }}
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>

                  <h2 className="text-2xl font-bold mb-1">{profileData.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{stats.rank}</p>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    Level {stats.level}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>Joined {profileData.joinDate}</span>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                      <Zap className="w-4 h-4" />
                      <span className="font-bold text-lg">{stats.totalXP}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Total XP</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-green-500 mb-1">
                      <Target className="w-4 h-4" />
                      <span className="font-bold text-lg">{stats.questsCompleted}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Quests</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-orange-500 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="font-bold text-lg">{stats.streak}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Day Streak</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-purple-500 mb-1">
                      <Trophy className="w-4 h-4" />
                      <span className="font-bold text-lg">{stats.badges}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Badges</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="edit">Edit Profile</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Bio */}
                <Card className="glass-card neo-brutal">
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{profileData.bio}</p>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="glass-card neo-brutal">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"
                        >
                          <div>
                            <h4 className="font-semibold text-sm">{activity.title}</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{activity.date}</p>
                          </div>
                          {activity.xp > 0 && (
                            <div className="flex items-center gap-1 text-yellow-600">
                              <Zap className="w-3 h-3" />
                              <span className="text-sm font-semibold">+{activity.xp}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="edit" className="space-y-6">
                <Card className="glass-card neo-brutal">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Edit Profile
                    </CardTitle>
                    <CardDescription>Update your personal information and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className="rounded-2xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="rounded-2xl"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                          className="rounded-2xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={profileData.website}
                          onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                          className="rounded-2xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        className="rounded-2xl min-h-[100px]"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <Button
                      onClick={handleSave}
                      className="w-full rounded-2xl font-semibold py-6 quest-gradient neo-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <Card className="glass-card neo-brutal">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      Achievements
                    </CardTitle>
                    <CardDescription>Your collection of earned badges and milestones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-2xl text-center transition-all ${
                            achievement.earned
                              ? "bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700"
                              : "bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 opacity-60"
                          }`}
                        >
                          <div className="text-3xl mb-2">{achievement.icon}</div>
                          <h4 className="font-semibold text-sm">{achievement.name}</h4>
                          {achievement.earned && (
                            <Badge className="mt-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                              Earned!
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card className="glass-card neo-brutal">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Account Settings
                    </CardTitle>
                    <CardDescription>Manage your notifications and privacy preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">Email Notifications</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Receive updates about your progress and new content
                          </p>
                        </div>
                        <Switch
                          checked={settings.emailNotifications}
                          onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">Push Notifications</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Get notified about streaks and achievements
                          </p>
                        </div>
                        <Switch
                          checked={settings.pushNotifications}
                          onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">Weekly Digest</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Receive a summary of your weekly progress
                          </p>
                        </div>
                        <Switch
                          checked={settings.weeklyDigest}
                          onCheckedChange={(checked) => setSettings({ ...settings, weeklyDigest: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">Public Profile</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Allow others to view your profile and achievements
                          </p>
                        </div>
                        <Switch
                          checked={settings.publicProfile}
                          onCheckedChange={(checked) => setSettings({ ...settings, publicProfile: checked })}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-semibold text-red-600 dark:text-red-400">Danger Zone</h4>
                      <Button variant="destructive" onClick={handleLogout} className="w-full rounded-2xl font-semibold">
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
