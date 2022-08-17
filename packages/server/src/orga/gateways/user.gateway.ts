import { 
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'
import { OrgaService } from "../orga.service";

@WebSocketGateway(3001, {
  cors: {
    origin: '*',
  }
})
export class OrgaGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server

  constructor(private orgaService: OrgaService){}

  afterInit(server: Server) {
    throw new Error("Method not implemented.");
  }
  handleConnection(client: Socket, ...args: any[]) {
    throw new Error("Method not implemented.");
  }
  handleDisconnect(client: Socket) {
    throw new Error("Method not implemented.");
  }

  @SubscribeMessage('update')
  handleMessage(client: Socket, payload: string){
    
  }
}