import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useMemo, type SubmitEvent } from "react";
import type { RegistrationFormType } from "@/lib/types";
import countryList from 'react-select-country-list'
import { postRegistration } from "@/lib/api";
import type {UserType} from "@/lib/types.tsx";
import type {State} from "@epfl-si/react-appauth";

const initialFormData: RegistrationFormType = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  address: "",
  addressComplement: "",
  city: "",
  region: "",
  postalCode: "",
  country: "CH",
  visitDate: "",
  visitTime: "",
  numberOfParticipants: "1",
  language: "fr",
  comments: "",
  gdprConsent: false,
};

export default function RegistrationForm({ user, oidc, idVisit }: { user: UserType, oidc: State, idVisit: string }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<RegistrationFormType>(initialFormData);
  const countryOptions = useMemo(() => countryList().getData(), []);

  function updateField<K extends keyof RegistrationFormType>(
    field: K,
    value: RegistrationFormType[K]
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }
  const checkDate = (date: string, time: string, maxTime: number) => {
    const selectedDateTime = new Date(`${date}T${time}`);
    const diffInDays = (selectedDateTime.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    if (diffInDays < maxTime) {
      alert(t("registration.date.tooSoon", { maxTime }));
      return false;
    }
    return true;
  }

  useEffect(() => {
    const savedFormData = localStorage.getItem("registrationFormData");
    if (savedFormData) {
      try {
        setFormData(JSON.parse(savedFormData));
      } catch {
        localStorage.removeItem("registrationFormData");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("registrationFormData", JSON.stringify(formData));
  }, [formData]);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.gdprConsent) {
      alert(t("registration.gdpr.consentRequired"));
      return;
    } else if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.visitDate || !formData.visitTime || !formData.numberOfParticipants || !formData.language || !formData.country || !formData.city || !formData.postalCode || !formData.address) {
      alert(t("registration.requiredFieldsMissing"));
      return;
    }
    // Max time is 7 days from now
    if (!checkDate(formData.visitDate, formData.visitTime, 7)) {
      return;
    }
    const timeStampDate = new Date(`${formData.visitDate}T${formData.visitTime}`).getTime();
    const formDataToSubmit = { ...formData, visitTimeStampDate: timeStampDate, idVisit: idVisit };
    try {
      await postRegistration(
        import.meta.env.GUIDED_TOURS_REACT_APP_BACKEND_ENDPOINT_URL,
        oidc.accessToken,
        formDataToSubmit
      );
      alert(t("registration.submitSuccess"));
    } catch (error) {
      console.error("Registration submission failed", error);
      alert(t("registration.submitError"));
    }
  };

  return (
    <form className="flex w-full max-w-md flex-col gap-5" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1.5">
        <Label>
          {t("registration.organizerName.label")}{" "}
          <span className="text-destructive">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-3">
          <Input
            placeholder={t("registration.organizerName.firstNamePlaceholder")}
            value={formData.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            required
          />
          <Input
            placeholder={t("registration.organizerName.lastNamePlaceholder")}
            value={formData.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>{t("registration.company.label")}</Label>
        <Input
          value={formData.company}
          onChange={(e) => updateField("company", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>
          {t("registration.email.label")} <span className="text-destructive">*</span>
        </Label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>
          {t("registration.phone.label")} <span className="text-destructive">*</span>
        </Label>
        <Input
          type="tel"
          value={formData.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>
          {t("registration.address.label")} <span className="text-destructive">*</span>
        </Label>
        <Input
          placeholder={t("registration.address.addressPlaceholder")}
          value={formData.address}
          onChange={(e) => updateField("address", e.target.value)}
          required
        />
        <Input
          placeholder={t("registration.address.complementPlaceholder")}
          value={formData.addressComplement}
          onChange={(e) => updateField("addressComplement", e.target.value)}
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            placeholder={t("registration.address.cityPlaceholder")}
            value={formData.city}
            onChange={(e) => updateField("city", e.target.value)}
          />
          <Input
            placeholder={t("registration.address.regionPlaceholder")}
            value={formData.region}
            onChange={(e) => updateField("region", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            placeholder={t("registration.address.postalCodePlaceholder")}
            value={formData.postalCode}
            onChange={(e) => updateField("postalCode", e.target.value)}
          />
          <Select
            value={formData.country}
            onValueChange={(value) => {
              if (value !== null) updateField("country", value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {countryOptions.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>
          {t("registration.date.label")} <span className="text-destructive">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="date"
            value={formData.visitDate}
            onChange={(e) => updateField("visitDate", e.target.value)}
            required
          />
          <Input
            type="time"
            value={formData.visitTime}
            onChange={(e) => updateField("visitTime", e.target.value)}
            required
          />
        </div>
        <p className="text-sm text-muted-foreground">{t("registration.date.hint")}</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>
          {t("registration.participants.label")} <span className="text-destructive">*</span>
        </Label>
        <Select
          value={formData.numberOfParticipants}
          onValueChange={(value) => {
            if (value !== null) updateField("numberOfParticipants", value);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label>
          {t("registration.language.label")} <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={formData.language}
          onValueChange={(value) => updateField("language", value)}
          className="grid-flow-col justify-start gap-8"
        >
          <Label className="font-normal">
            <RadioGroupItem value="fr" /> {t("registration.language.french")}
          </Label>
          <Label className="font-normal">
            <RadioGroupItem value="en" /> {t("registration.language.english")}
          </Label>
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>{t("registration.comments.label")}</Label>
        <Textarea
          value={formData.comments}
          onChange={(e) => updateField("comments", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>
          {t("registration.gdpr.label")} <span className="text-destructive">*</span>
        </Label>
        <Label className="font-normal">
          <Checkbox
            checked={formData.gdprConsent}
            onCheckedChange={(checked) => updateField("gdprConsent", checked === true)}
            required
          />
          {t("registration.gdpr.consent")}
        </Label>
        <p className="text-sm text-muted-foreground">{t("registration.gdpr.hint")}</p>
      </div>

      <Button type="submit" className="self-start">
        {t("registration.submit")}
      </Button>
    </form>
  );
}
