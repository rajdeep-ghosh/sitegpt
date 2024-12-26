import { currentUser } from '@clerk/nextjs/server';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default async function ChatMessage() {
  const user = await currentUser();

  return (
    <div className='flex gap-3'>
      <Avatar className='size-7 cursor-pointer rounded-lg'>
        <AvatarImage src={user?.imageUrl} alt={user?.fullName ?? 'avatar'} />
        <AvatarFallback className='uppercase'>
          {`${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`}
        </AvatarFallback>
      </Avatar>
      <div className='text-sm leading-6'>
        Hi Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
        delectus praesentium quo sit laudantium deserunt, accusamus doloribus
        recusandae rerum labore et dignissimos ipsa ab beatae, molestiae impedit
        vitae nostrum aspernatur. Totam repellat mollitia hic quos, cumque
        itaque eius laborum esse facere beatae commodi dolorem ipsum consequatur
        asperiores ad est soluta!
      </div>
    </div>
  );
}
