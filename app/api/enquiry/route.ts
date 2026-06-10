import { NextResponse } from 'next/server'
import { enquirySchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = enquirySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const reference = `DT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`

    // In production: send email via nodemailer/SMTP or post to ERPNext
    console.log('Enquiry received:', { ...parsed.data, reference })

    return NextResponse.json({ success: true, reference })
  } catch (error) {
    console.error('Enquiry error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
