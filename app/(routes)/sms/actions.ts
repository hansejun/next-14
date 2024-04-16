'use server';

import { z } from 'zod';
import validator from 'validator';
import { redirect } from 'next/navigation';

const phoneSchema = z
  .string()
  .trim()
  .refine(value => validator.isMobilePhone(value, 'ko-KR'), {
    message: 'Invalid phone number',
  });

const tokenSchema = z.coerce
  .number()
  .min(100000)
  .max(999999)
  .refine(value => String(value).length === 6, '토큰은 6자리여야 합니다.');

interface ActionState {
  token: boolean;
}

export async function smsLogIn(prevState: ActionState, formData: FormData) {
  const phone = formData.get('phone');
  const token = formData.get('token');

  const hasToken = prevState.token;

  if (!hasToken) {
    const phoneValue = phoneSchema.safeParse(phone);

    const isValidPhone = phoneValue.success;

    if (!isValidPhone) {
      return { token: false, error: phoneValue.error.flatten() };
    }

    return { token: true, error: undefined };
  }

  const tokenValue = tokenSchema.safeParse(token);

  const isValidToken = tokenValue.success;

  if (!isValidToken) {
    return { token: true, error: tokenValue.error.flatten() };
  }

  redirect('/');
}
