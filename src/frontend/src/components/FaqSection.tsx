import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

export default function FaqSection() {
  const faqs = [
    {
      question: 'How do I book a cab from Nashik to Pune?',
      answer: 'You can book a cab through our online booking form above or call us directly at +91 98765 43210. Simply provide your travel details, and we will confirm your booking within minutes.',
    },
    {
      question: 'What is the fare for Nashik to Pune taxi?',
      answer: 'The fare varies based on the vehicle type. Sedan starts from ₹2,500-₹3,000, SUV from ₹3,500-₹4,500, and Tempo Traveller from ₹5,500-₹7,000. These are approximate prices for one-way trips and may vary based on specific requirements.',
    },
    {
      question: 'How long does the journey take?',
      answer: 'The journey from Nashik to Pune typically takes 3-4 hours, covering approximately 165 km via NH 60. The actual duration may vary depending on traffic conditions and the specific pickup and drop locations.',
    },
    {
      question: 'Are your drivers verified and experienced?',
      answer: 'Yes, all our drivers are professionally trained, verified, and have extensive experience driving on the Nashik-Pune route. They are courteous, punctual, and prioritize passenger safety and comfort.',
    },
    {
      question: 'Can I book a round trip?',
      answer: 'Absolutely! We offer both one-way and round-trip services. When booking, simply select "Round Trip" in the trip type field. Round-trip bookings often come with better rates.',
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'We understand plans can change. You can cancel your booking up to 6 hours before the scheduled pickup time for a full refund. Cancellations made within 6 hours may incur a small cancellation fee.',
    },
    {
      question: 'Do you provide pickup from Nashik Airport or Railway Station?',
      answer: 'Yes, we provide pickup services from Nashik Airport, Nashik Road Railway Station, and any other location within Nashik city. Just specify your exact pickup location when booking.',
    },
    {
      question: 'Are there any hidden charges?',
      answer: 'No, we believe in complete transparency. The price quoted includes driver charges, fuel, and toll taxes. There are no hidden charges. Any additional stops or waiting time will be communicated and charged separately if applicable.',
    },
  ];

  return (
    <section className="bg-muted/30 py-16 md:py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Frequently Asked <span className="text-saffron">Questions</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Find answers to common questions about our Nashik to Pune cab service
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg border bg-card px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
