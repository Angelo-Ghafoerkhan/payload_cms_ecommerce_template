'use client'

import { useEffect, useState } from 'react'
import Input from '@/components/forms/react-hook-form/Input/Input'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface CreatePasswordProps {
  watch: any
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  onValidityChange: (isValid: boolean) => void // New callback prop
}

const CreatePassword: React.FC<CreatePasswordProps> = ({
  watch,
  register,
  errors,
  onValidityChange,
}) => {
  const [lengthValid, setLengthValid] = useState(false)
  const [capitalValid, setCapitalValid] = useState(false)
  const [symbolValid, setSymbolValid] = useState(false)
  const [passwordsValid, setPasswordsValid] = useState(false)

  const createPassword = watch('createPassword')
  const repeatPassword = watch('repeatPassword')

  useEffect(() => {
    // Validate password length (at least 8 characters)
    setLengthValid(createPassword?.length >= 8)
    // Validate if there is at least one capital letter
    setCapitalValid(/[A-Z]/.test(createPassword))
    // Validate if there is at least one symbol
    setSymbolValid(/[^a-zA-Z0-9]/.test(createPassword))

    // Validate if both passwords match and other validations pass
    if (
      createPassword &&
      createPassword === repeatPassword &&
      createPassword !== '' &&
      createPassword.length >= 8 &&
      /[A-Z]/.test(createPassword) &&
      /[^a-zA-Z0-9]/.test(createPassword)
    ) {
      setPasswordsValid(true)
      onValidityChange(true)
    } else {
      setPasswordsValid(false)
      onValidityChange(false)
    }
  }, [createPassword, repeatPassword, onValidityChange])

  return (
    <>
      <Input
        type="password"
        label="Create Password"
        required
        id="createPassword"
        register={register}
        errors={errors}
        animatePlaceholder={false}
      />

      <Input
        type="password"
        label="Repeat Password"
        required
        id="repeatPassword"
        register={register}
        errors={errors}
        animatePlaceholder={false}
      />

      <div className="mt-4 text-base">
        <p className={lengthValid ? 'text-green-500' : 'text-red-500'}>
          {lengthValid ? '✔' : '✘'} At least 8 characters
        </p>
        <p className={capitalValid ? 'text-green-500' : 'text-red-500'}>
          {capitalValid ? '✔' : '✘'} Contains at least 1 uppercase letter
        </p>
        <p className={symbolValid ? 'text-green-500' : 'text-red-500'}>
          {symbolValid ? '✔' : '✘'} Contains at least 1 symbol
        </p>
        <p
          className={
            createPassword === repeatPassword && createPassword !== ''
              ? 'text-green-500'
              : 'text-red-500'
          }
        >
          {createPassword === repeatPassword && createPassword !== '' ? '✔' : '✘'} Passwords match
        </p>
      </div>
    </>
  )
}

export default CreatePassword
