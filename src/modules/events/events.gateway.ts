import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets"
import { Server } from "socket.io"

export const Resources = [
  "ingredient",
  "dish",
  "table",
  "order"
]


@WebSocketGateway({ namespace: "events" })
export class EventsGateway {
  @WebSocketServer()
  server: Server
  sendNewResourceMessage<T>(resourceName: (typeof Resources)[number], resource: T) {
    this.server.emit(`new@${resourceName}`, resource)
  }
}
