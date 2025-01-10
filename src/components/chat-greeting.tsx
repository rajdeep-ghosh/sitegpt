import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';

export default function ChatGreeting() {
  const { user } = useUser();

  return (
    <div className='grid size-full place-content-center'>
      <h2 className='text-center text-2xl font-medium'>
        <motion.span
          initial={{ backgroundPositionX: '100%' }}
          animate={{ backgroundPositionX: 0 }}
          transition={{ ease: [0.05, 0.7, 0.1, 1], duration: 4 }}
          className='bg-gradient-to-r from-[#ffaa40] from-0% via-[#9c40ff] via-55% to-transparent to-75% bg-[length:350%_100%] bg-clip-text bg-[100%_0] text-transparent'
        >
          Hello, {user?.firstName}
        </motion.span>
        <br />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 0.6, delay: 0.3 }}
          className='text-xl font-normal'
        >
          How can I help?
        </motion.span>
      </h2>
    </div>
  );
}
