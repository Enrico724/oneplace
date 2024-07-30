import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { OnGatewayInit } from "@nestjs/websockets";
import { Observable } from "rxjs";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtStrategy } from "src/strategy";
import { JwtService } from "@nestjs/jwt";
import { ConnectedUser, FileEditingSession } from "src/model";
import { SharedFileService } from "src/service";
import { File } from "src/entities";

@WebSocketGateway({ namespace: '/editor', cors: { origin: '*' } })
export class EditorGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
    constructor(
        private jwtService: JwtService,
        private jwtStategy: JwtStrategy,
        private sharedFileService: SharedFileService,
    ) {}

    sessions: FileEditingSession[] = [];
    
    getOrCreate(file: File): FileEditingSession {
        const session = this.sessions.find(session => session.file.id == file.id)
        if (session == null) {
            const session = { file, users: [] };
            this.sessions.push(session);
            return session;
        }
        return session;
    }
    
    @WebSocketServer()
    server: Server;
    
    afterInit(server: Server) {
        console.log('Init', server.engine);
    }
    
    @UseGuards(AuthGuard('jwt'))
    async handleConnection(client: any): Promise<void> {
        try {
            const socketId = client.id;
            const token = client.handshake.auth.token;
            const fileId = client.handshake.query.uuid;
            const payload = this.jwtService.decode(token);
            const user = await this.jwtStategy.validate(payload);
            const { permission, file } = await this.sharedFileService.get(user, fileId);
            const session = this.getOrCreate(file);
            const connectedUser: ConnectedUser = { user, permission, pointer: 0, selectedText: 0, socketId };
            session.users.push(connectedUser);
            this.server.emit('user_connected', session);
        } catch(error) {
            console.error(error)
            client.disconnect();
        }
    }

    handleDisconnect(client: any): void {
        const socketId = client.id;
        const { uuid } = client.handshake.query;
        const session = this.sessions.find(session => session.file.id === uuid);
        const filtered = session.users.filter(user => user.socketId !== socketId);
        session.users = filtered;
        this.server.emit('user_connected', session);
    }

    @SubscribeMessage('ask_info')
    get(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): FileEditingSession {
        const socketId = client.id;
        const { uuid } = client.handshake.query;
        const session = this.sessions.find(session => session.file.id === uuid);
        return session;
    }
}
