"use client"

import { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeft, ArrowRight, DollarSign, Rocket, TrendingUp, Wrench, Handshake } from "lucide-react"

const services = [
  {
    icon: DollarSign,
    title: "How Do I Fund This?",
    subtitle: "Capital Strategy",
    description:
      "Apply investor-level diligence to decide if the raise is right. Build the narrative, data room, and relationships to secure the right capital on the best terms.",
  },
  {
    icon: Rocket,
    title: "How Do I Build This?",
    subtitle: "Startup Operating Model",
    description:
      "Stand up the financial infrastructure, operating cadence, and capital structure that turn ambition into executable, investor-ready plans.",
  },
  {
    icon: TrendingUp,
    title: "How Do I Grow This?",
    subtitle: "Small Business Excellence",
    description:
      "Install scalable systems, reporting, and mentorship so you operate like an owner-investor—building a durable, valuable asset and legacy.",
  },
  {
    icon: Wrench,
    title: "How Do I Fix This?",
    subtitle: "Turnaround Planning",
    description:
      "Create a credible turnaround plan, communicate it to lenders and investors, and negotiate alongside you to restore confidence and execution.",
  },
  {
    icon: Handshake,
    title: "How Do I Sell This?",
    subtitle: "M&A Strategy",
    description:
      "Define the transaction goal first, underwrite and model the business, and run a sponsor-led process to reach the right outcome.",
  },
]

export default function ServicesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: false,
  })
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => {
      setCanPrev(emblaApi.canScrollPrev())
      setCanNext(emblaApi.canScrollNext())
    }
    emblaApi.on("select", onSelect)
    onSelect()
  }, [emblaApi])

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <div
                key={idx}
                className="flex-shrink-0 basis-[88%] sm:basis-[60%] lg:basis-1/3"
                aria-label={service.title}
              >
                <div className="h-full p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors hover-lift flex flex-col gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{service.title}</h3>
                    <p className="text-sm text-primary font-medium mb-2">{service.subtitle}</p>
                    <p className="text-foreground/70 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 mt-6">
        <button
          onClick={scrollPrev}
          disabled={!canPrev}
          className="p-2 rounded-md border border-border bg-card hover:bg-muted/60 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous service"
        >
          <ArrowLeft size={16} />
        </button>
        <button
          onClick={scrollNext}
          disabled={!canNext}
          className="p-2 rounded-md border border-border bg-card hover:bg-muted/60 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Next service"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
