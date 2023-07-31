import BadRequestException from "./badRequest.exception";
import ConflictRequestException from "./conflictRequest.exception";
import EmailAlreadyRegisteredException from "./emailAlreadyRegistered.exception";
import ForbiddenRequestException from "./forbiddenRequest.exception";
import NotFoundException from "./notFound.exception";
import UnauthorizedException from "./unauthorized.exception";

const ClientException = {
    BadRequestException,
    ConflictRequestException,
    EmailAlreadyRegisteredException,
    ForbiddenRequestException,
    NotFoundException,
    UnauthorizedException,
}

export default ClientException