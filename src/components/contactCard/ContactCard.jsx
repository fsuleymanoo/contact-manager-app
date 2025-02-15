import './GlassCard.css'
import GlassCard from '../glassCard/GlassCard'

function ContactCard({name, email, isCompleted}) {
  return (
    <div className='w-100 d-flex justify-content-center'>
      <GlassCard className="p-4">
        {name}
        {email}
        {isCompleted}
      </GlassCard>
    </div>
  )
}

export default ContactCard
