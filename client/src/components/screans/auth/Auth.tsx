'use client'

import { AtSign, KeyRound, UserCircleIcon } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAuthForm } from './auth.types'
import Field from "@/ui/field/Field";
import { Button } from "@/ui/button/Button";
import toast from "react-hot-toast";

interface IAuth {
  type?: 'Login' | 'Register'
}

export function Auth({ type }: IAuth) {
  const { push } = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit } = useForm<IAuthForm>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IAuthForm> = async data => {
    setIsLoading(true);
    const response = await signIn(
      'credentials',
      {
        email: data.email,
        password: data.password,
        username: type === 'Register' ? `${data.firstName} ${data.lastName}` : '',
        redirect: false,
      }
    )

    if (response?.error) {
      toast.error(response.error)
      setIsLoading(false)
      return
    }

    toast.success('Success login!')
    setIsLoading(false)
    push('/')
  }

  return (
    <div className='flex w-screen h-full'>
      <form onSubmit={handleSubmit(onSubmit)} className='m-auto block w-96 border border-border p-8'>
        <h1 className='text-center mb-10'>{type}</h1>
        {type === 'Register' && <div>
          <Field
            {...register('firstName', {
              required: true,
            })}
            placeholder='Enter first name'
            type='text'
            Icon={UserCircleIcon}
            className='mb-8'
          />
          <Field
            {...register('lastName', {
              required: true,
            })}
            placeholder='Enter last name'
            type='text'
            Icon={UserCircleIcon}
            className='mb-8'
          />
        </div>}

        <Field
          {...register('email', {
            required: true,
          })}
          placeholder='Enter email'
          type='email'
          Icon={AtSign}
          className='mb-8'
        />
        <Field
          {...register('password', {
            required: true,
            minLength: {
              value: 6,
              message: 'Min length 6 symbols!',
            },
          })}
          placeholder='Enter password'
          type='password'
          Icon={KeyRound}
          className='mb-12'
        />

        <div className='text-center'>
          <Button isLoading={isLoading} disabled={isLoading} type='submit'>
            {type}
          </Button>
        </div>
      </form>
    </div>
  )
}
