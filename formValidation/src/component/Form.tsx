import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  gender: string;
  subject: string[];
}
export const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    gender: "",
    subject: [],
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    gender?: string;
    subject?: string;
  }>({});

  const validate = (data: FormData) => {
    const newErrors: {
      name?: string;
      email?: string;
      phone?: string;
      gender?: string;
      subject?: string;
    } = {};

    if (!data.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z ]+$/.test(data.name)) {
      newErrors.name = "Name must contain only letters";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!data.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(data.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!data.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!data.subject.length) {
      newErrors.subject = "Select at least one subject";
    }
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        subject: checked
          ? [...prev.subject, value]
          : prev.subject.filter((sub) => sub !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      localStorage.setItem("formData", JSON.stringify(formData));
      alert("Form submitted successfully!");
      setFormData({ name: "", email: "", phone: "", gender: "", subject: [] });
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span style={{ color: "red" }}>{errors.phone}</span>}
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && (
            <span style={{ color: "red" }}>{errors.gender}</span>
          )}
        </div>
        <div>
          <label htmlFor="subject">Subject</label>
          <label htmlFor="mathematics">
            <input
              id="mathematics"
              type="checkbox"
              name="mathematics"
              value="mathematics"
              checked={formData.subject.includes("mathematics")}
              onChange={handleChange}
            />
            Mathematics
          </label>
          <br />
          <label htmlFor="science">
            <input
              id="science"
              type="checkbox"
              name="science"
              value="science"
              checked={formData.subject.includes("science")}
              onChange={handleChange}
            />
            Science
          </label>
          <br />
          <label htmlFor="english">
            <input
              id="english"
              type="checkbox"
              name="english"
              value="english"
              checked={formData.subject.includes("english")}
              onChange={handleChange}
            />
            English
          </label>
          {errors.subject && (
            <span style={{ color: "red" }}>{errors.subject}</span>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
