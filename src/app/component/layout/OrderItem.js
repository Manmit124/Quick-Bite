
import { dbTimeForHuman } from '@/app/lib/datetime';
import Link from 'next/link';


const OrderItem = ({ order }) => (
  <div key={order._id} className="border mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6">

    <div className="grow flex flex-col md:flex-row items-center gap-6">
      <div>
        <div className={`${order.paid ? 'bg-green-500' : 'bg-red-400'} p-2 rounded-md text-white   w-24 text-center`}>
          {order.paid ? 'Paid' : 'Not paid'}
          {order.paid}
          
        </div>
      </div> 
      <div className="grow">
        <div className="flex gap-2 items-center mb-1 flex-col lg:flex-row">
          <div className="grow">{order.userEmail}</div>
          <div className="text-gray-500 text-sm">{dbTimeForHuman(order.createdAt)}</div>
        </div>
        <div className="text-gray-500 text-xs truncate">
          {order.cartProducts.map(p => p.name).join(', ')}
        </div>
      </div>
    </div>
    <div className="justify-end flex gap-2 items-center whitespace-nowrap border rounded-md p-2 hover:bg-white hover:text-black">
      <Link href={`/orders/${order._id}`}>
        Show order
      </Link>
    </div>
  </div>
);

export default OrderItem;
