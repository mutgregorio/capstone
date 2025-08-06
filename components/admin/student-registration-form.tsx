"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface StudentRegistrationFormProps {
  onSuccess: () => void
  onCancel: () => void
}

export default function StudentRegistrationForm({ onSuccess, onCancel }: StudentRegistrationFormProps) {
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    studentId: "",
    mobileNumber: "",
    email: "",
    course: "",
    yearSection: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    // Basic validation
    for (const key in formData) {
      if (!formData[key as keyof typeof formData]) {
        toast({
          title: "Validation error",
          description: `Please fill in the ${key} field.`,
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }
    }

    try {
      const res = await fetch("/api/student-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to register student")
      }

      toast({
        title: "Success",
        description: "Student registered successfully.",
      })
      setFormData({
        firstName: "",
        lastName: "",
        studentId: "",
        mobileNumber: "",
        email: "",
        course: "",
        yearSection: "",
      })
      onSuccess()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-md shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="studentId">ID Number</Label>
          <Input id="studentId" name="studentId" value={formData.studentId} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="mobileNumber">Mobile Number</Label>
          <Input id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="course">Course</Label>
          <Input id="course" name="course" value={formData.course} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="yearSection">Year and Section</Label>
          <Input id="yearSection" name="yearSection" value={formData.yearSection} onChange={handleChange} required />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
      </div>
    </form>
  )
}
