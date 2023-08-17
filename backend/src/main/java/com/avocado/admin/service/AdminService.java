package com.avocado.admin.service;

import com.avocado.Item.domain.entity.Item;
import com.avocado.Item.domain.entity.ItemStatus;
import com.avocado.Item.domain.entity.Type;
import com.avocado.Item.domain.repository.ItemRepository;
import com.avocado.admin.controller.dto.live.BroadcastCreateDto;
import com.avocado.admin.controller.dto.live.BroadcastResponseDto;
import com.avocado.admin.controller.dto.live.LiveAuctionByBroadcastResponseDto;
import com.avocado.admin.controller.dto.live.LiveItemsResponseDto;
import com.avocado.live.board.domain.entity.LiveAuction;
import com.avocado.live.board.domain.repository.LiveAuctionRepository;
import com.avocado.live.broadcast.domain.Broadcast;
import com.avocado.live.broadcast.domain.BroadcastRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final BroadcastRepository broadcastRepository;
    private final ItemRepository itemRepository;
    private final LiveAuctionRepository liveAuctionRepository;

    @Transactional
    public boolean saveBroadcast(BroadcastCreateDto broadcastCreateDto) {
        try {
            broadcastRepository.save(Broadcast.builder()
                    .title(broadcastCreateDto.getTitle())
                    .introduce(broadcastCreateDto.getIntroduce())
                    .startAt(broadcastCreateDto.getStartAt())
                    .status(false).build());
        }catch (Exception e) {
            return false;
        }
        return true;
    }

    public List<BroadcastResponseDto> findByDate(String date) {
        List<Broadcast> broadcastList = broadcastRepository.findByStartAt(date).orElse(null);
        if(CollectionUtils.isEmpty(broadcastList)) return null;
        return broadcastList.stream().map(broadcast -> BroadcastResponseDto.builder()
                .broadcastId(broadcast.getId())
                .link(broadcast.getLink())
                .sessionId(broadcast.getSessionId())
                .startAt(broadcast.getStartAt())
                .title(broadcast.getTitle())
                .status(broadcast.getStatus())
                .introduce(broadcast.getIntroduce()).build()).collect(Collectors.toList());
    }

    public List<LiveItemsResponseDto> findApprovedLiveItems() {
        List<Item> approvedLiveItems = itemRepository.findByItemStatusAndType(ItemStatus.APPROVE, Type.LIVE).orElse(null);
        if(CollectionUtils.isEmpty(approvedLiveItems)) return null;
        return approvedLiveItems.stream().map(item -> LiveItemsResponseDto.builder()
                .itemId(item.getId())
                .name(item.getName())
                .category(item.getCategory()).build()).collect(Collectors.toList());
    }

    public List<LiveAuctionByBroadcastResponseDto> findLiveAuctionByBroadcastId(Long broadcastId) {
        List<LiveAuction> liveAuctions = liveAuctionRepository.findByBroadcast_Id(broadcastId).orElse(null);
        if(CollectionUtils.isEmpty(liveAuctions)) return null;
        return liveAuctions.stream().map(liveAuction -> LiveAuctionByBroadcastResponseDto.builder()
                .liveAuctionId(liveAuction.getId())
                .name(liveAuction.getItem().getName())
                .category(liveAuction.getItem().getCategory()).build()).collect(Collectors.toList());
    }

    @Transactional
    public boolean assignLiveAuctionToBroadcast(Long itemId, Long broadcastId) {
        Item item  = itemRepository.findById(itemId).orElse(null);
        Broadcast broadcast = broadcastRepository.findById(broadcastId).orElse(null);
        if(Objects.isNull(item) || Objects.isNull(broadcast)) return false;
        liveAuctionRepository.save(LiveAuction.builder()
                .status(0)
                .broadcast(broadcast)
                .item(item).build());
        item.setItemStatus(ItemStatus.ASSIGN);
        itemRepository.save(item);
        return true;
    }
}
