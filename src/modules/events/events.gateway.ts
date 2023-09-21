import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets"
import { Server } from "socket.io"

export const Resources = {
  ingredient: "ingredient",
  dish: "dish",
  table: "order",
  order: "order",
}

@WebSocketGateway({ namespace: "events" })
export class EventsGateway {
  @WebSocketServer()
  server: Server
  sendNewResourceMessage<T>(resourceName: keyof typeof Resources, resource: T) {
    this.server.emit(`new@${resourceName}`, resource)
  }
}
