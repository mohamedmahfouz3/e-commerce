import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Toast, ToastType } from './Toast'

interface NotifyProps {
  success?: string
  error?: string
  info?: string
  warning?: string
}

export default function Notify({ success, error, info, warning }: NotifyProps) {
  const [show, setShow] = useState(false)
  const [type, setType] = useState<ToastType>('success')
  const [message, setMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (success) {
      setType('success')
      setMessage(success)
      setShow(true)
    } else if (error) {
      setType('error')
      setMessage(error)
      setShow(true)
    } else if (info) {
      setType('info')
      setMessage(info)
      setShow(true)
    } else if (warning) {
      setType('warning')
      setMessage(warning)
      setShow(true)
    }
  }, [success, error, info, warning])

  useEffect(() => {
    const handleRouteChange = () => {
      setShow(false)
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router])

  return (
    <Toast
      type={type}
      message={message}
      show={show}
      onClose={() => setShow(false)}
    />
  )
} 