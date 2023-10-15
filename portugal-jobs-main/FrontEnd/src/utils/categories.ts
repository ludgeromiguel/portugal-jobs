import EditSvg from '../assetss/Pencil-icon.svg';
import EditCvSvg from '../assetss/Document-icon.svg';
import SeeAnnounceSvg from '../assetss/Megaphone-icon.svg';
import CreateAnnounceSvg from '../assetss/Men-icon.svg';

export const categories = [
    {id: '1', title: 'Editar Dados', icon: EditSvg, page: 'ChangeData'},
    {id: '2', title: 'Editar CV', icon: EditCvSvg, page: 'EditCV'},
    {id: '3', title: 'Ver Anuncios', icon: SeeAnnounceSvg, page: 'SeeAd'},
    {id: '4', title: 'Criar Anuncio', icon: CreateAnnounceSvg, page: 'CreateAnnounce'},
    {id: '5', title: 'Ver Anuncios Criados', icon: SeeAnnounceSvg, page: 'SeeMyAnnounce'},
]