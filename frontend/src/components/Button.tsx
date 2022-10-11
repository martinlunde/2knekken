import React from 'react';

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
}

export default function Button({ title, ...props }: ButtonProps) {
  return (
    <button className='p-2 bg-indigo-600 text-white rounded-lg' {...props} type="button">
      {title}
    </button>
  )
}