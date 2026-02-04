# Form Patterns

Guidelines and patterns for building forms in the Taloo application.

## Basic Form Structure

### Standard Form Layout

```tsx
<form onSubmit={handleSubmit} className="max-w-md space-y-6">
  {/* Form fields with consistent spacing */}
  <div className="space-y-4">
    <FormField name="email" label="Email" />
    <FormField name="password" label="Password" />
  </div>

  {/* Action buttons */}
  <div className="flex gap-3 pt-4">
    <Button type="button" variant="outline" onClick={onCancel}>
      Annuleren
    </Button>
    <Button type="submit">
      Opslaan
    </Button>
  </div>
</form>
```

## Form Fields

### Input with Label

```tsx
<div className="space-y-2">
  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
    Naam
  </Label>
  <Input
    id="name"
    type="text"
    placeholder="Voer naam in..."
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
</div>
```

### Input with Helper Text

```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
  <p className="text-xs text-gray-500">
    We zullen je email nooit delen
  </p>
</div>
```

### Input with Validation Error

```tsx
<div className="space-y-2">
  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
    Email
  </Label>
  <Input
    id="email"
    type="email"
    className={cn(
      error && "border-red-500 focus:ring-red-500"
    )}
    aria-invalid={!!error}
    aria-describedby={error ? "email-error" : undefined}
  />
  {error && (
    <p id="email-error" className="text-xs text-red-600">
      {error}
    </p>
  )}
</div>
```

### Textarea Field

```tsx
<div className="space-y-2">
  <Label htmlFor="description">Beschrijving</Label>
  <Textarea
    id="description"
    placeholder="Voer beschrijving in..."
    rows={4}
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />
  <p className="text-xs text-gray-500">
    Max 500 karakters
  </p>
</div>
```

### Select Field

```tsx
<div className="space-y-2">
  <Label htmlFor="category">Categorie</Label>
  <Select value={category} onValueChange={setCategory}>
    <SelectTrigger id="category">
      <SelectValue placeholder="Selecteer categorie..." />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="option1">Optie 1</SelectItem>
      <SelectItem value="option2">Optie 2</SelectItem>
      <SelectItem value="option3">Optie 3</SelectItem>
    </SelectContent>
  </Select>
</div>
```

### Radio Group

```tsx
<div className="space-y-3">
  <Label className="text-sm font-medium text-gray-700">
    Selecteer type
  </Label>
  <RadioGroup value={type} onValueChange={setType}>
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="type1" id="type1" />
      <Label htmlFor="type1" className="font-normal cursor-pointer">
        Type 1
      </Label>
    </div>
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="type2" id="type2" />
      <Label htmlFor="type2" className="font-normal cursor-pointer">
        Type 2
      </Label>
    </div>
  </RadioGroup>
</div>
```

### Checkbox

```tsx
<div className="flex items-center space-x-2">
  <Checkbox
    id="terms"
    checked={accepted}
    onCheckedChange={setAccepted}
  />
  <Label
    htmlFor="terms"
    className="text-sm font-normal cursor-pointer"
  >
    Ik accepteer de voorwaarden
  </Label>
</div>
```

## Form Layouts

### Single Column Form (Default)

```tsx
<form className="max-w-md space-y-6">
  <div className="space-y-4">
    <FormField name="field1" />
    <FormField name="field2" />
    <FormField name="field3" />
  </div>
</form>
```

### Two Column Form

```tsx
<form className="max-w-4xl space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <FormField name="firstName" label="Voornaam" />
    <FormField name="lastName" label="Achternaam" />
    <FormField name="email" label="Email" />
    <FormField name="phone" label="Telefoon" />
  </div>
</form>
```

### Form with Sections

```tsx
<form className="max-w-2xl space-y-8">
  {/* Section 1 */}
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-900">
      Persoonlijke informatie
    </h3>
    <div className="space-y-4">
      <FormField name="name" />
      <FormField name="email" />
    </div>
  </div>

  {/* Section 2 */}
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-900">
      Bedrijfsgegevens
    </h3>
    <div className="space-y-4">
      <FormField name="company" />
      <FormField name="role" />
    </div>
  </div>

  {/* Actions */}
  <div className="flex gap-3 pt-4">
    <Button variant="outline">Annuleren</Button>
    <Button>Opslaan</Button>
  </div>
</form>
```

## Form Actions

### Standard Button Group

```tsx
<div className="flex gap-3">
  <Button type="button" variant="outline">
    Annuleren
  </Button>
  <Button type="submit">
    Opslaan
  </Button>
</div>
```

### Right-Aligned Actions

```tsx
<div className="flex justify-end gap-3">
  <Button variant="outline">Annuleren</Button>
  <Button>Opslaan</Button>
</div>
```

### Space-Between Actions

```tsx
<div className="flex items-center justify-between">
  <Button type="button" variant="ghost">
    Terug
  </Button>
  <div className="flex gap-3">
    <Button variant="outline">Opslaan als concept</Button>
    <Button>Publiceren</Button>
  </div>
</div>
```

### Loading State

```tsx
<Button type="submit" disabled={isSubmitting}>
  {isSubmitting ? (
    <>
      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
      Opslaan...
    </>
  ) : (
    'Opslaan'
  )}
</Button>
```

## Validation

### Client-Side Validation

```tsx
const [errors, setErrors] = useState<Record<string, string>>({});

const validate = () => {
  const newErrors: Record<string, string> = {};

  if (!email) {
    newErrors.email = 'Email is verplicht';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = 'Ongeldig email adres';
  }

  if (!password || password.length < 8) {
    newErrors.password = 'Wachtwoord moet minimaal 8 karakters zijn';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (validate()) {
    // Submit form
  }
};
```

### Displaying Validation Errors

```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className={cn(errors.email && "border-red-500")}
    aria-invalid={!!errors.email}
  />
  {errors.email && (
    <p className="text-xs text-red-600">{errors.email}</p>
  )}
</div>
```

### Form-Level Error

```tsx
{formError && (
  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
    <p className="text-sm text-red-800">{formError}</p>
  </div>
)}
```

### Success Message

```tsx
{success && (
  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
    <p className="text-sm text-green-800">
      Succesvol opgeslagen!
    </p>
  </div>
)}
```

## Dialog Forms

### Form in Dialog

```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button>Nieuwe vacature</Button>
  </DialogTrigger>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>Nieuwe vacature aanmaken</DialogTitle>
      <DialogDescription>
        Vul de onderstaande gegevens in
      </DialogDescription>
    </DialogHeader>

    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField name="title" label="Titel" />
      <FormField name="description" label="Beschrijving" />

      <DialogFooter>
        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
          Annuleren
        </Button>
        <Button type="submit">
          Aanmaken
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
```

## Accessibility

### Required Fields

```tsx
<Label htmlFor="email">
  Email <span className="text-red-500" aria-label="required">*</span>
</Label>
<Input
  id="email"
  type="email"
  required
  aria-required="true"
/>
```

### Error Announcements

```tsx
<Input
  id="email"
  aria-invalid={!!error}
  aria-describedby={error ? "email-error" : undefined}
/>
{error && (
  <p id="email-error" role="alert" className="text-xs text-red-600">
    {error}
  </p>
)}
```

### Form Instructions

```tsx
<form aria-labelledby="form-title" aria-describedby="form-description">
  <h2 id="form-title" className="text-xl font-semibold">
    Registratie
  </h2>
  <p id="form-description" className="text-sm text-gray-500">
    Alle velden met een * zijn verplicht
  </p>

  {/* form fields */}
</form>
```

## Best Practices

**Do:**
- Use consistent spacing (`space-y-4` for fields, `space-y-6` for sections)
- Provide clear labels for all inputs
- Show validation errors inline below the field
- Use appropriate input types (email, tel, number, etc.)
- Disable submit button during submission
- Show loading state during async operations
- Provide success feedback after submission

**Don't:**
- Use placeholder as label replacement
- Show errors before user interaction (except on submit)
- Use generic error messages
- Nest forms
- Make forms too wide (max-w-4xl for multi-column, max-w-md for single)
- Hide required field indicators
